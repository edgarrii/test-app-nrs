import React, { forwardRef, memo } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export const Input = memo(
  forwardRef<TextInput, TextInputProps>(({ style, ...rest }, ref) => {
    return (
      <TextInput
        ref={ref}
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
        keyboardType="web-search"
        returnKeyType="search"
        style={[styles.input, style]}
        placeholderTextColor="#b89881"
        placeholder="Search..."
        {...rest}
      />
    );
  }),
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
});
