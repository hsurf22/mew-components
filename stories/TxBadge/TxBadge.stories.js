import {
  withKnobs,
  boolean,
  optionsKnob
} from '@storybook/addon-knobs';
import TxBadge from '@/components/TxBadge/TxBadge.vue';

export default {
  title: 'TxBadge',
  parameters: {
    component: TxBadge
  },
  decorators: [withKnobs]
};

const badgeOptions = {
  in: 'txIn',
  out: 'txOut',
  swap: 'swap',
  error: 'error'
}

export const txBadge = () => ({
  components: { 'badge': TxBadge },
  props: {
    enableDarkMode: {
      default: boolean('dark mode ?', false)
    },
    badgeType: {
      default: optionsKnob('badge-type', badgeOptions, badgeOptions.in , { display: 'inline-radio' })
    }
  },
  watch: {
    enableDarkMode(newVal) {
      this.$vuetify.theme.dark = newVal === true ? true : false;
    }
  },
  template: `
    <div>
    <br />
    <badge
      :badge-type="badgeType"
    />
  </div>`
});