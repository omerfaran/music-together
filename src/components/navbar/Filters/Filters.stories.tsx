import { FaFemale, FaMale } from "react-icons/fa";
import { FiltersPure as Filters } from "./Filters";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Filters> = {
  component: Filters,
};

export default {
  title: "App / Filters",
  component: Filters,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Filters>;

export const Basic: Story = {
  args: {
    orderByList: [
      { label: "Last active", value: "updated" },
      { label: "Newest members", value: "created" },
    ],
    genderList: [
      { value: "male", icon: FaMale },
      { value: "female", icon: FaFemale },
    ],
    filters: {
      ageRange: [18, 100],
      gender: ["male", "female"],
      orderBy: "updated",
      withPhoto: true,
    },
    selectAge: console.log,
    selectGender: console.log,
    selectWithPhoto: console.log,
    isPending: false,
  },
};
