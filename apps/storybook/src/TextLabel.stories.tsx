import type { Meta, StoryObj } from '@storybook/react';
import { TextLabel } from '@searchpic/ui';

const meta: Meta<typeof TextLabel> = {
  component: TextLabel,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    size: {
      control: 'text',
      description: '단위를 포함한 텍스트 사이즈를 입력합니다. ex) 15px, 28px, 32px',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      table: {
        type: { summary: 'normal | medium | semibold | bold' },
      },
    },
    color: { control: 'color' },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      table: {
        type: { summary: 'left | center | right' },
      },
    },
    whitespace: {
      control: 'select',
      options: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap'],
      table: {
        type: { summary: 'normal | nowrap | pre | pre-line | pre-wrap' },
      },
    },
    wordBreak: {
      control: 'select',
      options: ['normal', 'break-all', 'break-word'],
      table: {
        type: { summary: 'normal | break-all | break-word' },
      },
    },
    additionalClasses: {
      control: 'text',
      description: '추가로 적용할 Tailwind CSS 클래스를 입력합니다.',
    },
  },
};
export default meta;

type Story = StoryObj<typeof TextLabel>;

/** 기본 텍스트 스타일 */
export const Default: Story = {
  args: {
    text: 'Default \nText',
  },
};
