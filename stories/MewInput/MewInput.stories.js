import { withKnobs, number, text, boolean, array, optionsKnob } from '@storybook/addon-knobs';
import MewInput from '@/components/MewInput/MewInput.vue';

export default {
  title: 'MewInput',
  parameters: {
    component: MewInput
  },
  decorators: [withKnobs]
};

const ruleValue = [value => !!value || 'Required.'];

const textInputTypes = {
  tel: 'tel',
  text: 'text',
  time: 'time',
  url: 'url',
  week: 'week',
  search: 'search',
  month: 'month',
  number: 'number',
  password: 'password',
  datetime: 'datetime-local',
  email: 'email'
}

const optionsObj = {
  display: 'inline-radio'
};

export const MEWInput = () => ({
  components: { MewInput },
  props: {
    disabled: {
      default: boolean('disabled', false)
    },
    hasNoBorder: {
      default: boolean('has-no-border', false)
    },
    label: {
      default: text('label', 'label')
    },
    placeholder: {
      default: text('placeholder', 'placeholder')
    },
    value: {
      default: text('value', '')
    },
    rightLabel: {
      default: text('right-label', '')
    },
    hideClearBtn: {
      default: boolean('hide-clear-btn', false)
    },
    rules: {
      default: array('rules', ruleValue)
    },
    isSearch: {
      default: boolean('is-search', false)
    },
    type: {
      default: optionsKnob('type', textInputTypes, 'text', optionsObj)
    },
    showBlockie: {
      default: boolean('show-blockie', false)
    },
    enableDarkMode: {
      default: boolean('dark mode ?', false)
    },
    resolvedAddr: {
      default: text('resolved-addr', '')
    },
    hint: {
      default: text('hint', '')
    },
    id: {
      default: number('id', null)
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
    <mew-input ref="input" :id="id" :hint="hint" :resolved-addr="resolvedAddr" :show-blockie="showBlockie" :has-no-border="hasNoBorder" :is-search="isSearch" :rules="rules" :hide-clear-btn="hideClearBtn" :right-label="rightLabel" :disabled="disabled" :label="label" :placeholder="placeholder" :value="value" :type="type"
    />
  </div>`
});
