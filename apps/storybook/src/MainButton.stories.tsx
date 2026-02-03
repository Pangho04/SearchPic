import type { Meta, StoryObj } from '@storybook/react';
import { MainButton } from '@searchpic/ui';

const meta: Meta<typeof MainButton> = {
  component: MainButton,
  tags: ['autodocs'],
  argTypes: {
    styleTheme: {
      control: 'select',
      options: ['primary', 'secondary'],
      table: {
        type: { summary: 'primary | secondary' },
      },
    },
    additionalClasses: {
      control: 'text',
      description: '추가로 적용할 Tailwind CSS 클래스를 입력합니다.',
    },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof MainButton>;

/** 기본 버튼 스타일 */
export const Default: Story = {
  args: {
    text: 'Text',
    styleTheme: 'primary',
  },
};

/** 버튼 호버 시 스타일 */
export const Hover: Story = {
  args: {
    text: 'Text',
    styleTheme: 'primary',
  },
  decorators: [
    (Story) => (
      <div className="sb-button-state-hover">
        <Story />
      </div>
    ),
  ],
};

/** 버튼 클릭 시 스타일 */
export const Clicked: Story = {
  args: {
    text: 'Text',
    styleTheme: 'primary',
  },
  decorators: [
    (Story) => (
      <div className="sb-button-state-pressed">
        <Story />
      </div>
    ),
  ],
};

/** 버튼 비활성화 시 스타일 */
export const Disabled: Story = {
  args: {
    text: 'Text',
    disabled: true,
  },
};
