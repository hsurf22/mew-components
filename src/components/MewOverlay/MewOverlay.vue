<template>
  <div>
    <v-bottom-sheet
      :value="isOverlayOn" 
      :fullscreen="true"
    >
      <v-sheet 
        height="100%" 
        color="overlayBg"
        class="mew-overlay-container"
      >
        <v-container>
          <v-row
            align="center"
            class="pt-5"
            :justify="leftBtnText ? 'space-between' : 'end'"
          > 
            <div
              v-if="leftBtnText"
              class="close-container cursor-pointer d-flex align-center ml-4"
              @click="goBack"
            > 
              <v-icon
                color="titlePrimary"
              >
                mdi-arrow-left-circle-outline
              </v-icon>
              <span class="titlePrimary--text font-weight-medium ml-2">{{ leftBtnText }}</span>
            </div>
            <div
              v-if="rightBtnText"
              class="close-container cursor-pointer d-flex align-center mr-4"
              @click="closeOverlay"
            > 
              <v-icon
                color="error"
              >
                mdi-close-circle-outline
              </v-icon>
              <span class="error--text font-weight-medium ml-2">{{ rightBtnText }}</span>
            </div>
          </v-row>
          <v-row 
            align="center"
            class="pt-5 mb-6"
            justify="center"
          >
            <span
              class="mew-subtitle titlePrimary--text"
            >{{ title }}</span>
          </v-row>
          <div class="body-container d-flex flex-column align-center justify-center">
            <slot name="mewOverlayBody" />
            <mew-button
              class="mt-4"
              v-if="btnText"
              color-theme="primary"
              btn-type="background"
              :title="btnText"
            />
            <mew-warning-sheet
              v-if="warningTitle || warningDesc"
              :title="warningTitle"
              :description="warningDesc"
            />
          </div>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import MewButton from '@/components/MewButton/MewButton.vue';
import MewWarningSheet from '@/components/MewWarningSheet/MewWarningSheet.vue';

export default {
  name: 'MewOverlay',
  data() {
    return {
      isOverlayOn: false
    }
  },
  components: {
    MewButton,
    MewWarningSheet
  },
  props: {
    /**
     * Shows the overlay.
     */
    showOverlay: {
      type: Boolean,
      default: false
    },
    /**
     * Title of overlay.
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Displays and shows the button text.
     */
    btnText: {
      type: String,
      default: ''
    },
    /**
     * Displays and shows the warning title.
     */
    warningTitle: {
      type: String,
      default: ''
    },
    /**
     * Displays and shows the warning description.
     */
    warningDesc: {
      type: String,
      default: ''
    },
    /**
     * Right button string.
     */
    rightBtnText: {
      type: String,
      default: ''
    },
    /**
     * Left button string.
     */
    leftBtnText: {
      type: String,
      default: ''
    },
    /**
     * Close button.
     */
    close: {
      type: Function,
      default: () => {
        return {};
      }
    },
    /**
     * Back button.
     */
    back: {
      type: Function,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    showOverlay(newVal) {
      this.isOverlayOn = newVal;
    }
  },
  mounted() {
    this.isOverlayOn = this.showOverlay;
  },
  methods: {
    closeOverlay() {
      this.$emit('closeOverlay')
      this.close();
    },
    goBack() {
      this.$emit('back')
      this.back();
    }
  }
}
</script>

<style lang="scss" scoped>
.mew-overlay-container {
  overflow: auto;
}
</style>