import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ChatInput from "domains/chat/components/ChatInput";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

export default {
  title: "chat/ChatInput",
  component: ChatInput,
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphonex",
    },
  },
  args: {},
} as ComponentMeta<typeof ChatInput>;

export const ChatInputComponent: ComponentStory<typeof ChatInput> = (args) => {
  return <ChatInput {...args} submit={() => {}} />;
};
