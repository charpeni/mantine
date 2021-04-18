import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useListState } from '@mantine/hooks';
import { Cross1Icon, PlusIcon } from '@modulz/radix-icons';
import { Title, Checkbox, TextInput, ActionIcon } from '@mantine/core';
import { useMantineTheme } from '@mantine/theme';

interface TodoItem {
  value: string;
  completed: boolean;
  key: string;
}

const INITIAL_STATE: TodoItem[] = [
  { value: 'Buy 23 RTX 3080 cards', completed: false, key: nanoid() },
  { value: 'Mine Ethereum', completed: false, key: nanoid() },
  {
    value: 'Complain about miners on internet to prove innocence',
    completed: false,
    key: nanoid(),
  },
  { value: 'Sell broken cards on ebay to gamers', completed: false, key: nanoid() },
  { value: 'Spend received money on new video cards', completed: false, key: nanoid() },
  { value: 'Repeat the cycle', completed: false, key: nanoid() },
];

export function TodoList() {
  const theme = useMantineTheme();
  const [newItem, setNewItem] = useState('');
  const [state, handlers] = useListState(INITIAL_STATE);

  const items = state.map((item, index) => (
    <div
      style={{ display: 'flex', alignItems: 'center', marginTop: theme.spacing.xs }}
      key={item.key}
    >
      <Checkbox
        size="xl"
        checked={item.completed}
        onChange={(event) => {
          handlers.setItemProp(index, 'completed', event.currentTarget.checked);
          if (event.currentTarget.checked) {
            handlers.reorder({ from: index, to: state.length - 1 });
          }
        }}
      />

      <TextInput
        style={{ flex: 1, marginLeft: theme.spacing.md }}
        placeholder="Your evil plan part"
        variant="filled"
        value={item.value}
        onChange={(event) => handlers.setItemProp(index, 'value', event.currentTarget.value)}
        inputStyle={{
          textDecoration: item.completed && 'line-through',
          color: item.completed && theme.colors.gray[5],
        }}
      />

      <ActionIcon
        size="lg"
        style={{ marginLeft: theme.spacing.xs }}
        onClick={() => handlers.remove(index)}
      >
        <Cross1Icon />
      </ActionIcon>
    </div>
  ));

  return (
    <div>
      <Title style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>Business Plan</Title>

      {items}

      <TextInput
        style={{ marginTop: theme.spacing.xl }}
        value={newItem}
        onChange={(event) => setNewItem(event.currentTarget.value)}
        icon={<PlusIcon />}
        placeholder="Add evil task"
        onKeyDown={(event) => {
          if (event.nativeEvent.code === 'Enter') {
            handlers.append({ value: event.currentTarget.value, completed: false, key: nanoid() });
            setNewItem('');
          }
        }}
      />
    </div>
  );
}