import type { Meta, StoryObj } from '@storybook/react';
import { ImageView } from '@searchpic/ui';

const meta: Meta<typeof ImageView> = {
  component: ImageView,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    width: {
      control: 'text',
      description: '이미지 너비를 입력합니다. ex) 100px, 100%, 50%',
    },
    height: {
      control: 'text',
      description: '이미지 높이를 입력합니다. ex) 100px, 100%, 50%',
    },
    radius: {
      control: 'select',
      options: [8, 16, 24],
      table: {
        type: { summary: '8 | 16 | 24' },
      },
    },
    ratio: {
      control: 'select',
      options: ['16:9', '4:3', '1:1', '9:16', '3:4', '3:2', 'auto'],
      table: {
        type: { summary: '16:9 | 4:3 | 1:1 | 9:16 | 3:4 | 3:2 | auto' },
      },
    },
    additionalContainerClasses: { control: 'text' },
    additionalImageClasses: { control: 'text' },
    scaleType: {
      control: 'select',
      options: ['none', 'cover', 'contain', 'fill'],
      table: {
        type: { summary: 'none | cover | contain | fill' },
      },
    },
    alt: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof ImageView>;

/** 기본 텍스트 스타일 */
export const Default: Story = {
  args: {
    src: 'https://picsum.photos/id/0/5000/3333',
  },
};
