import { defineStore } from 'pinia';
import avatar from 'assets/images/avatar.jpeg';
import { formatMoneyToNumber } from 'src/util/formatter';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    money: 0,
    description: '',
    members: [],
    networkId: '',
  }),
  getters: {
    getMoney() {
      return this.money;
    },
    getDescription() {
      return this.description;
    },
    getMembers() {
      return this.members;
    },
    getNetworkId() {
      return this.networkId;
    }
  },
  actions: {
    setMoney(money, members) {
      this.money = formatMoneyToNumber(money);
      this.members = this.calculateMoneyDistribution(members, this.money);
    },

    setNetworkId(networkId) {
      this.networkId = networkId;
    },

    recalculateMoneyWhenUpdateMoneyMember(money, id) {
      this.members = this.members.map((member) => {
        if (member.id === id) {
          return {
            ...member,
            money: formatMoneyToNumber(money),
            updateMoney: true,
          };
        }
        return member;
      });

      const totalMoneyUpdated = this.members.reduce((acc, member) => {
        if (member.updateMoney) {
          return acc + member.money;
        }
        return acc;
      }, 0);

      const remainingMoney = this.money - totalMoneyUpdated;

      // Re-distribute money to non-updated members
      const membersToUpdate = this.members.filter(member => !member.updateMoney);
      if (membersToUpdate.length > 0) {
        const updatedMembers = this.calculateMoneyDistribution(membersToUpdate, remainingMoney, true);
        this.members = this.members.map(member => {
          return member.updateMoney ? member : updatedMembers.find(m => m.id === member.id);
        });
      }
    },

    ediTotalImpact(member, money) {

      // nếu người cuối cùng cập nhật số tiền mà lớn hơn số tiền còn lại thì sẽ báo lỗi
      const membersNotUpdate = this.members.filter(member => !member.updateMoney);
      if (membersNotUpdate.length === 1 && member.updateMoney === false) {
        const totalMoneyUpdated = this.members.reduce((acc, member) => {
          if (member.updateMoney) {
            return acc + member.money;
          }
          return acc;
        }, 0);
        const remainingMoney = this.money - totalMoneyUpdated;
        if (money > remainingMoney || money < remainingMoney) {
          return true;
        }
      }

      // kiểm tra trước xem nếu số tiền sau khi tính toán cập nhật có giá trị < 0 thì sẽ báo lỗi
      const totalMoneyUpdated = this.members.reduce((acc, member1) => {
        if (member1.updateMoney && member1.id !== member.id) {
          return acc + member1.money;
        }
        return acc;
      }, 0);

      const remainingMoney = this.money - totalMoneyUpdated;

      if (remainingMoney - money < 0) {
        return true;
      }


      return false;
    },

    setDescription(description) {
      this.description = description;
    },

    updateSelectedMember(memberId) {
      const memberNotUpdateMoneyList = this.members.filter(member => !member.updateMoney);
      if (memberNotUpdateMoneyList.length === 1 && !this.members.find(member => member.id === memberId).updateMoney) {
        return;
      }

      // nếu tất cả không được chọn thì return
      if (this.members.filter(member => member.selected).length === 1 && this.members.find(member => member.id === memberId).selected) {
        return;
      }

      this.members = this.members.map(member => {
        if (member.id === memberId) {
          return {
            ...member,
            selected: !member.selected,
            updateMoney: false,
            money: 0,
          };
        }
        return member;
      });
    },

    recalculateMoneyWhenUpdateSelectedMember(memberId) {
      this.updateSelectedMember(memberId);

      const memberNotUpdateMoneyList = this.members.filter(member => !member.updateMoney);
      if (memberNotUpdateMoneyList.length === 1 && !this.members.find(member => member.id === memberId).updateMoney) {
        return false;
      }

      // nếu tất cả không được chọn thì return
      if (this.members.filter(member => member.selected).length === 1 && this.members.find(member => member.id === memberId).selected) {
        return false;
      }

      // tính toán chia đều số tiền cho các member đã chọn nếu updateMoney = false
      const membersNotUpdate = this.members.filter(member => !member.updateMoney && member.selected);
      const totalMoneyUpdated = this.members.reduce((acc, member) => {
        if (member.updateMoney) {
          return acc + member.money;
        }
        return acc;
      }, 0);

      const moneyDevided = this.money - totalMoneyUpdated;
      const updatedMembers = this.calculateMoneyDistribution(membersNotUpdate, moneyDevided, true);

      this.members = this.members.map(member => {
        return member.updateMoney || !member.selected ? member : updatedMembers.find(m => m.id === member.id);
      });

      console.log('recalculateMoneyWhenUpdateSelectedMember', this.members);
      return true;
    },

    // Utility method to calculate and assign money distribution
    calculateMoneyDistribution(members, totalMoney, roundFirstMember = false) {
      const numMembers = members.length;
      const equalSharePerMember = Math.floor((totalMoney / numMembers) * 1000) / 1000;
      let remainingAmount = totalMoney - equalSharePerMember * numMembers;

      return members.map((member, index) => {
        let moneyForMember = equalSharePerMember;

        // Optionally apply rounding to the first member
        if (roundFirstMember && index === 0 && remainingAmount > 0) {
          moneyForMember = Math.round((equalSharePerMember + remainingAmount) * 1000) / 1000;
          remainingAmount = 0; // after adjusting, reset remaining amount
        }

        return {
          ...member,
          money: moneyForMember,
          avatar: member.avatar || avatar,
          updateMoney: member.updateMoney || false,
        };
      });
    },
  },
});
