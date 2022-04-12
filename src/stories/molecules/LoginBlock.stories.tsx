import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoginBlock from "components/molecules/LoginBlock";
import "styles/ui.common.css";

export default {
  title: "molecules/LoginBlock",
  component: LoginBlock,
  argTypes: {}
} as ComponentMeta<typeof LoginBlock>;

const Template: ComponentStory<typeof LoginBlock> = args => (
  <LoginBlock {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  goLogin: () => console.log("go login!")
};
