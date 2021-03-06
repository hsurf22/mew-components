<template>
  <div>
    <v-combobox
      class="address-select pa-0"
      v-model="addressValue"
      color="titlePrimary"
      :items="items"
      :label="label"
      item-value="address"
      item-text="address"
      :placeholder="placeholder"
      :disabled="disabled"
      :hint="resolvedAddr ? resolvedAddr : ''"
      :persistent-hint="resolvedAddr.length > 0"
      :rules="rules"
      :error-messages="errorMsg"
      :menu-props="{ value: autoSelectMenu, closeOnClick: true }"
      ref="addressInput"
      outlined
    >
      <template v-slot:prepend-inner>
        <div
          v-if="!isValidAddress"
          class="blockie-placeholder mr-1 selectHover"
        />
        <div
          v-if="isValidAddress"
          class="blockie-container mr-1"
        >
          <mew-blockie
            :address="blockieAddr"
            width="25px"
            height="25px"
          />
        </div>
      </template>

      <template v-slot:append>
        <div class="icon-container d-flex align-center">
          <mew-copy
            class="mr-3"
            :tooltip="copyTooltip"
            :copy-ref="getRef()"
            :is-ref="true"
          />
          <v-tooltip
            content-class="tooltip-inner"
            color="titlePrimary--text"
            top
          >
            <template v-slot:activator="{ on }">
              <v-icon
                :class="['save-icon', enableSaveAddress ? 'basic--text' : 'disabled--text, no-pointer-events']"
                v-on="on"
                @click="saveAddress"
              >
                mdi-bookmark-outline
              </v-icon>
            </template>
            <span>{{ saveTooltip }}</span>
          </v-tooltip>
        </div>
        <div
          class="dropdown-icon-container d-flex align-center justify-center cursor-pointer full-height"
          @click="toggle"
        >
          <v-icon class="mew-heading-1 mx-5">
            mdi-chevron-down
          </v-icon>
        </div>
      </template>

      <template v-slot:item="{ item }">
        <div
          class="py-4 px-0 full-width d-flex align-center justify-space-between"
          @click="selectAddress(item)"
        >
          <div class="d-flex align-center justify-space-between">
            <mew-blockie
              class="mr-2"
              :address="item.resolvedAddr ? item.resolvedAddr : item.address"
              width="25px"
              height="25px"
            />
            <div class="mew-address">
              {{ item.address }}
            </div>
          </div>
          <div class="overline primary--text font-weight-medium">
            {{ item.nickname }}
          </div>
        </div>
      </template>
    </v-combobox>
    <mew-toast
      ref="toast"
      :duration="2000"
      toast-type="success"
      :text="successToast"
    />
  </div>
</template>

<script>
import MewBlockie from '@/components/MewBlockie/MewBlockie.vue';
import MewToast from '@/components/MewToast/MewToast.vue';
import MewCopy from '@/components/MewCopy/MewCopy.vue';

export default {
  name: 'MewAddressSelect',
  props: {
    /**
     * For validating your input - accepts an array of functions that take an input value as an argument and return either true / false or a string with an error message.
     */
    rules: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /**
     * Resolved address
     */
    resolvedAddr: {
      type: String,
      default: ''
    },
    /**
     * Address select input value.
     */
    value: {
      type: String,
      default: ''
    },
    /**
     * Disables the input.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Enables save address button.
     */
    enableSaveAddress: {
      type: Boolean,
      default: false
    },
    /**
     * Returns if the address is valid or not.
     */
    isValidAddress: {
      type: Boolean,
      default: false
    },
    /**
     * The input label.
     */
    label: {
      type: String,
      default: 'To Address'
    },
    /**
     * The saved addresses in address book.
     */
    items: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /**
     * The input placeholder.
     */
    placeholder: {
      type: String,
      default: 'Please enter an address'
    },
    /**
     * Tooltip for copy.
     */
    copyTooltip: {
      type: String,
      default: ''
    },
    /**
     * Tooltip for save address.
     */
    saveTooltip: {
      type: String,
      default: ''
    },
    /**
     * Text for toast success.
     */
    successToast: {
      type: String,
      default: ''
    },
    /**
     * Error message.
     */
    errorMsg: {
      type: String,
      default: ''
    }
  },
  components: {
    MewBlockie,
    MewToast,
    MewCopy
  },
  data() {
    return {
      addressValue: '',
      autoSelectMenu: false
    };
  },
  mounted() {
    this.addressValue = this.value;
  },
  computed: {
    blockieAddr() {
      return this.resolvedAddr.length > 0 ? this.resolvedAddr : this.addressValue.address ? this.addressValue.address : this.addressValue;
    }
  },
  watch: {
    addressValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
      }
    },
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.addressValue = newVal;
      }
    }
  },
  methods: {
    clear() {
      this.addressValue = null
    },
    getRef() {
      if (this.$refs.addressInput) {
        return this.$refs.addressInput.$el.querySelector('input')
      }
    },
    saveAddress() {
      this.$emit('saveAddress');
    },
    toggle() {
      this.autoSelectMenu = !this.autoSelectMenu;
    },
    selectAddress(data) {
      this.autoSelectMenu = false;
      this.addressValue = data.address;
    }
  }
};
</script>

<style lang="scss">
.v-application  {
  // address select input
  .address-select {
    &.v-text-field {
      input {
        font-family: 'PT Mono';
      }
    }

    &.v-input--is-focused  {
      .dropdown-icon-container {
        border-left: 1px solid var(--v-titlePrimary-base) !important;
      }
    }

    .blockie-container {
      max-height: 25px;
    }

    // right icons
    .v-input__append-inner {
      height: 100%;
      margin-top: 0;
    }

    .icon-container {
      
      .copy-icon {
        font-size: 20px;
      }

      .save-icon {
        font-size: 22px;
        margin-top: 3px;
      }

      .v-icon {
        &:hover {
          color: var(--v-primary-base) !important;
        }
      }
    }

    &.v-select.v-input--is-focused {
      .mdi-chevron-down {
        color: var(--v-titlePrimary-base);
      }
    }

    .dropdown-icon-container {
      border-left: 1px solid var(--v-disabled-base);
      margin-left: 15px;
      margin-right: -15px;
    }
  }
}
</style>
