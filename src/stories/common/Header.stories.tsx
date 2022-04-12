import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "components/common/BasicLayout/Header";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

export default {
  title: "common/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphonex",
    },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: "타이틀",
  back: true,
  backFunc: () => console.log(1),
};
