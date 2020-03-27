// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import MewButton from './MewButton';
import Primary from "./Primary";
import Basic from "./Basic";
import Error from "./Error";
import Secondary from "./Secondary";
import White from "./White";
import Disabled from "./Disabled";

export default {
  title: "MewButton",
  parameters: {
    backgrounds: [
      { name: 'White', value: '#00aced', default: true },
      // { name: 'facebook', value: '#3b5998' },
    ]
  },
};

// export const MEWTheme = () =>  ({
//   components: { "mew-button": MewButton },
//   template: `
//     <div>
//     <mew-button
//       btn-style="transparent"
//       title="MEW Transparent"
//       color-theme="mew"
//       @click="action"
//     />
//     <br/>
//     <mew-button
//       btn-style="outline"
//       title="MEW Outline"
//       color-theme="mew"
//       @click="action"
//     />
//     <br/>
//     <mew-button
//       btn-style="background"
//       title="MEW Background"
//       color-theme="mew"
//       @click="action"
//     />
//     <mew-button
//       btn-style="background"
//       title="Basic Background"
//       color-theme="error"
//       @click="action"
//     />
//   </div>`
// });

export const PrimaryTheme = () => Primary;
export const BasicTheme = () => Basic;
export const ErrorTheme = () => Error;
export const SecondaryTheme = () => Secondary;
export const WhiteTheme = () => White;
export const DisabledTheme = () => Disabled;

WhiteTheme.story = {
  parameters: {
    backgrounds: [{ name: "red", value: "rgba(255, 0, 0)", default: true }]
  }
};
