<script setup>
import { ref, nextTick } from 'vue';
import avatar from 'assets/images/avatar.jpeg';
import { formatMoneyToNumber, formatMoneyVant } from 'src/util/formatter';
import { useTransactionStore } from 'stores/transaction-store';

// Props
const props = defineProps({
  memberUpdateMoney: {
    type: Object,
    default: Object.freeze({
      id: null,
      avatar: null,
      username: null,
      email: null,
      selected: false,
      isSelf: false,
      money: null,
    }),
  },
  totalMoney: {
    type: Number,
    required: true,
  },
});

// Emits
const emit = defineEmits(['updateMoneySuccess']);

// Data and refs
const member = ref({ ...props.memberUpdateMoney });
const showDialog = defineModel('showDialog', { type: Boolean, default: false });
const moneyInputRef = ref(null);
const transaction = useTransactionStore();

// Validation error state
const moneyErrorMessage = ref('');

// Focus the money input when the dialog opens
const handleDialogOpened = () => {
  nextTick(() => {
    if (moneyInputRef.value) {
      moneyInputRef.value.focus();
    }
  });
};

// Define validation rules
const rules = {
  money: [
    {
      required: true,
      message: 'Số tiền là bắt buộc',
    },
    {
      validator: (value) => {
        if (formatMoneyToNumber(value) > props.totalMoney) {
          return `Số tiền không được lớn hơn ${props.totalMoney.toLocaleString()} VND.`;
        }

        if (transaction.ediTotalImpact(member.value, formatMoneyToNumber(value))) {
          return 'Chỉnh sửa này ảnh hưởng đến tổng số tiền của giao dịch.';
        }

        return true;
      },
    },
  ],
};

// Validate and submit form
const confirmUpdateMoney = () => {
  moneyErrorMessage.value = '';
  const form = moneyInputRef.value;

  //validate	Validate form	name?: string | string[]	Promise<void>
  form.validate().then(() => {
    emit('updateMoneySuccess', member.value);
  }).catch((error) => {
    moneyErrorMessage.value = error.errors[0].message;
  });
};

// Cancel handling
const handleClose = (action) => {
  if (action === 'confirm') {
    confirmUpdateMoney();
  } else {
    emit('update:showDialog', false)
  }
};

</script>

<template>
  <van-dialog
    v-model:show="showDialog"
    show-cancel-button
    cancel-button-text="Hủy"
    @opened="handleDialogOpened"
    :before-close="handleClose"
  >
    <template #title>
      <!-- Avatar and username -->
      <div class="tw-flex tw-items-center tw-ml-4">
        <van-image
          round
          width="50px"
          height="50px"
          :src="member.avatar || avatar"
          fit="cover"
          class="tw-mr-4"
        />
        <span class="tw-text-base text-weight-bold">{{ member.username }}</span>
      </div>
    </template>

    <template #default>
      <!-- Update money form -->
      <div class="tw-my-2">
        <van-form ref="moneyInputRef" :model="member" :rules="rules">
          <van-field
            v-model="member.money"
            name="money"
            label="Số tiền"
            placeholder="Nhập số tiền"
            type="number"
            clearable
            :error-message="moneyErrorMessage"
            required
            :rules="rules.money"
            :formatter="formatMoneyVant"
          />
        </van-form>
      </div>
    </template>
  </van-dialog>
</template>

<style scoped>
</style>
