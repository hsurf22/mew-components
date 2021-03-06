import {
  withKnobs,
  boolean,
  object,
  text
} from '@storybook/addon-knobs';
import MewTable from '@/components/MewTable/MewTable.vue';

export default {
  title: 'MewTable',
  parameters: {
    component: MewTable
  },
  decorators: [withKnobs]
};

const tableHeaders = [
  {
    text: 'Activity',
    value: 'activity',
    sortable: false,
    filterable: false,
    width: '100%'
  },
  {
    text: 'Date',
    value: 'date',
    sortable: false,
    filterable: false,
    width: '60%'
  },
  {
    text: 'Tx Hash',
    value: 'txHash',
    sortable: false,
    filterable: false,
    containsLink: true,
    width: '100%'
  }
]

const tableData = [
  {
    activity: 'Deposited 0.0001 ETH into Vault',
    date: '01/02/2020, 2:16:32 PM',
    txHash: '0xDECAF9CD2367cdbb726E904cD6397eDFcAe6068D'
  },
  {
    activity: 'Generated 30.0000 new Dai from Vault',
    date: '01/02/2020, 1:25:53 PM',
    txHash: '0xAECAF9CD2367cdbb726E904cD6397eDFcAe6068D'
  },
  {
    activity: 'Generated 2.0 new Dai from Vault',
    date: '01/05/2020, 1:25:53 PM',
    txHash: '0xAECAF9CD2367cdbb726E904cD6397eDFcAe6068D'
  }
]

const tableSelectHeaders = [
  {
    text: 'Address',
    value: 'address',
    sortable: false,
    filterable: false,
    width: '100%'
  },
  // {
  //   text: 'Eth Balance',
  //   value: 'ethBalance',
  //   sortable: false,
  //   filterable: false,
  //   width: '30%'
  // },
  {
    text: '#Token',
    value: 'token',
    sortable: false,
    filterable: false,
    containsLink: true,
    width: '30%'
  },
  {
    text: '24H Changes',
    value: 'change',
    sortable: false,
    filterable: false,
    width: '30%'
  },
  {
    text: '',
    value: 'callToAction',
    sortable: false,
    filterable: false,
    width: '20%'
  }
]


const tableSelectData = [
  {
    ethBalance: '0.0001 ETH',
    token: '21',
    tokenImg: 'https://cdn4.iconfinder.com/data/icons/cryptocoins/227/ETH-512.png',
    address: '0xAECAF9CD2367cdbb726E904cD6397eDFcAe6068D'
  },
  {
    ethBalance: '2.23 ETH',
    token: '10',
    address: '0xDECAF9CD2367cdbb726E904cD6397eDFcAe6068D',
    change: '0.23%',
    status: '+',
    changeData: {
      x: [1, 4, 10, 4],
      y: [5, 1, 34, 43]
    }
  },
  {
    ethBalance: '0.23 ETH',
    token: '8',
    address: '0xAECFF9CD2367cdbb726E904cD6397eDFcAe6068D',
    callToAction: 'Edit'
  }
]

export const mewTable = () => ({
  components: { MewTable },
  props: {
    enableDarkMode: {
      default: boolean('dark mode ?', false)
    },
    tableHeaders: {
      default: object('table-headers', tableHeaders)
    },
    tableSelectHeaders: {
      default: object('table-select-headers', tableSelectHeaders)
    },
    tableSelectData: {
      default: object('table-select-data', tableSelectData)
    },
    tableData: {
      default: object('table-data', tableData)
    },
    hasSelect: {
      default: boolean('has-select', false)
    },
    hasColor: {
      default: boolean('has-color', true)
    },
    successToast: {
      default: text('success-toast', 'Success!')
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
    <mew-table
      :has-color="hasColor"
      :success-toast="successToast"
      :has-select="hasSelect"
      :table-data="hasSelect ? tableSelectData : tableData"
      :table-headers="hasSelect ? tableSelectHeaders : tableHeaders"
      @selectedRow="onSelect"
      @onClick="onClick"
    />
    
  </div>`,
  methods: {
    onSelect(newVal) {
      // eslint-disable-next-line no-console
      console.log('selected:', newVal);
    },
    onClick(newVal) {
      // eslint-disable-next-line no-console
      console.log('on click, row:', newVal);
    }
  }
});
