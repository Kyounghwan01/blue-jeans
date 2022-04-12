import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CustomList from "components/common/CustomList";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

export default {
  title: "molecules/MenuList",
  component: CustomList,
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphonex",
    },
  },
  args: {
    title: "메뉴타이틀",
    func: () => {},
  },
} as ComponentMeta<typeof CustomList>;

export const CustomListComponent: ComponentStory<typeof CustomList> = (
  args
) => {
  return <CustomList {...args} />;
};
