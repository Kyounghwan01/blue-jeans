import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Footer from "components/common/BasicLayout/Footer";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

export default {
  title: "common/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphonex",
    },
  },
  arg: {
    tab: 1,
  },
} as ComponentMeta<typeof Footer>;

export const Templates: ComponentStory<typeof Footer> = (args) => {
  const [tab, setTab] = useState(args.tab);

  return <Footer {...args} tab={tab} setTab={setTab} />;
};
