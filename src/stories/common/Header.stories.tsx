import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "components/common/BasicLayout/Header";

export default {
  title: "common/Header",
  component: Header,
  argTypes: {}
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = args => <Header {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: "storybook header title",
  back: true,
  backFunc: () => console.log(1)
};
