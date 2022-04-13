import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ChatRow from "domains/chat/components/ChatRow";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

export default {
  title: "chat/ChatRow",
  component: ChatRow,
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphonex"
    }
  },
  args: {
    sendBy: true,
    content: "챗입니다",
    timeStamp: "1000"
  }
} as ComponentMeta<typeof ChatRow>;

export const ChatRowComponent: ComponentStory<typeof ChatRow> = args => {
  return <ChatRow {...args} />;
};
