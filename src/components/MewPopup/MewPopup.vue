<template>
  <div>
    <v-dialog
      class="text-center"
      max-width="400"
      height="100%"
      :persistent="false"
      v-model="open"
    >
      <v-card>
        <v-card-title
          v-if="title"
          :class="[popupType.toLowerCase() === popupTypes.confirm ? 'pt-6 titlePrimary--text' : 'pa-0 white--text','text-center' , 'justify-center', 'font-weight-bold']"
        >
          <img
            v-if="popupType.toLowerCase() === popupTypes.error"
            height="100%"
            width="100%"
            :src="errorImg"
          >
          <span :class="popupType.toLowerCase() === popupTypes.error ? 'error-popup-title' : ''">{{ title }}</span>
        </v-card-title>
        <div class="px-8">
          <v-card-text
            v-if="desc"
            class="text-left titlePrimary--text px-0"
          >
            {{ desc }}
          </v-card-text>
          <v-card-actions class="px-0 btn-container d-flex align-center justify-center pb-6">
            <mew-button
              @click.native="onClick(buttonLeft)"
              v-if="buttonLeft"
              :title="buttonLeft.title"
              :color-theme="buttonLeft.colorTheme"
              btn-style="outline"
            />
            <mew-button 
              @click.native="onClick(buttonRight)"
              v-if="buttonRight"
              :class="buttonLeft ? 'ml-3' : ''"
              :title="buttonRight.title"
              :color-theme="buttonRight.colorTheme"
              btn-style="background"
            />
          </v-card-actions>
          <div
            v-if="popupType.toLowerCase() === popupTypes.error && errorMsg"
            class="footer-container pb-9"
          >
            <div class="text-center">
              <slot name="footerText" />
            </div>
            <v-divider />
            <div
              class="d-flex justify-space-between mew-heading-3 pa-4 titlePrimary--text"
            >
              <span>{{ errorHeader }}</span>
              <v-icon
                @click="toggleErrMsg"
                class="titlePrimary--text cursor-pointer"
                v-if="!showsErr"
              >
                mdi-chevron-down
              </v-icon>
              <v-icon
                @click="toggleErrMsg" 
                class="titlePrimary--text cursor-pointer"
                v-if="showsErr"
              >
                mdi-chevron-up
              </v-icon>
            </div>
            <div
              v-if="showsErr"
              class="px-4 pb-4 mew-address error-container"
            >
              <textarea
                class="full-height full-width no-pointer-events"
                ref="errContainer"
                v-model="errorMsg"
              />
            </div>
            <v-divider />
            <div
              v-if="showsErr"
              class="text-center font-weight-medium mt-6"
            >
              <span
                class="cursor-pointer primary--text text-decoration-underline"
                @click="copyToClipboard"
              >{{ copyMsg }}</span>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <mew-toast
      ref="toast"
      :duration="2000"
      toast-type="success"
      :text="successToast"
    />
  </div>
</template>

<script>
import MewButton from '@/components/MewButton/MewButton.vue';
import MewToast from '@/components/MewToast/MewToast.vue';
import copy from '@/helpers/copy.js';
import errorImg from '@/assets/images/popup-img.png';

export default {
  name: 'MewPopup',
  components: {
    MewButton,
    MewToast
  },
  data() {
    return {
      errorImg: errorImg,
      open: false,
      showsErr: false,
      popupTypes: {
        error: 'error',
        confirm: 'confirm'
      }
    }
  },
  mounted() {
    this.open = this.isOpen
  },
  watch: {
    isOpen(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.open = newVal
      }
    }
  },
  props: {
    /**
     * Controls whether the component is visible or hidden.
     */
    isOpen: {
      type: Boolean,
      default: false
    },
    /**
     * Pop-up title.
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Pop-up description. 
     */
    desc: {
      type: String,
      default: ''
    },
    /**
     * Button type: confirm or error. 
     */
    popupType: {
      type: String,
      default: ''
    },
    /**
     * Left button attributes. 
     */
    buttonLeft: {
      type: Object,
      default: () => {
        return {title: '', color: ''};
      }
    },
    /**
     * Right button attributes. 
     */
    buttonRight: {
      type: Object,
      default: () => {
        return {title: '', color: ''};
      }
    },
    /**
     * Error message. 
     */
    errorMsg: {
      type: String,
      default: ''
    },
    /**
     * Error message header. 
     */
    errorMsgTitle: {
      type: String,
      default: 'Error Message'
    },
    /**
     * Error message header. 
     */
    errorHeader: {
      type: String,
      default: 'Error Message'
    },
    /**
     * Copy message string. 
     */
    copyMsg: {
      type: String,
      default: 'Copy the message'
    },
    /**
     * Text for toast success.
     */
    successToast: {
      type: String,
      default: ''
    }
  },
  methods: {
    toggleErrMsg() {
      this.showsErr = !this.showsErr;
    },
    onClick(btn) {
      this.$emit('onClick', btn);
    },
    copyToClipboard() {
      copy(this.$refs.errContainer, true);
      this.$refs.toast.showToast();
    },
  }
}

</script>

<style lang="scss" scoped>
.error-container {
  height: 100px;
}

.error-popup-title {
  position: absolute;
}
</style>