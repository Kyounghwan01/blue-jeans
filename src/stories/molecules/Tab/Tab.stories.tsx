import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TabExample from "stories/molecules/Tab/Tab";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { useArgs } from "@storybook/client-api";

export default {
  title: "molecules/Tab",
  component: TabExample,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS
    }
  },
  args: {
    tabType: "pc",
    previousText: "PC에서 청구하기",
    nextText: "Mobile에서 청구하기",
    previousValue: "pc",
    nextValue: "mo"
  }
} as ComponentMeta<typeof TabExample>;

export const Tab: ComponentStory<typeof TabExample> = args => {
  const [{ tabType }, updateArgs] = useArgs();
  const handleClose = (str: string) => updateArgs({ tabType: str });
  return (
    <TabExample
      {...args}
      previous={() => handleClose("pc")}
      next={() => handleClose("mo")}
      tabType={tabType}
    />
  );
};
