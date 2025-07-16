import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { StatesList } from '@/components/StatesList';
import { useListData } from '@/hooks/useListData';
import { State } from '@/types/types';

export default function HomeScreen() {
  const { top, bottom } = useSafeAreaInsets();

  const [search, setSearch] = useState('');
  const [highlightedStates, setHighlightedStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<State | null>(null);

  const { originalData, modifiedData, isLoading, isError } = useListData(search, highlightedStates);

  const inputRef = useRef<TextInput>(null);

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const handleItemPress = useCallback(
    (state: State) => {
      if (!selectedState) {
        setSelectedState(state);
        hideKeyboard();
      }
    },
    [selectedState],
  );

  const handleItemDoublePress = useCallback((state: string) => {
    setHighlightedStates((prev) => (prev.includes(state) ? prev.filter((i) => i !== state) : [...prev, state]));
    hideKeyboard();
  }, []);

  const hideKeyboard = () => {
    Keyboard.dismiss();
    inputRef.current?.blur();
  };

  const handleInputSubmit = () => {
    hideKeyboard();
  };

  if (isLoading) {
    return (
      <View style={[styles.wrapper, styles.centerContent]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.wrapper, styles.centerContent]}>
        <Text style={styles.errorText}>Sorry, something went wrong :(</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapper,
          { paddingTop: top + styles.wrapper.paddingTop, paddingBottom: bottom + styles.wrapper.paddingBottom },
        ]}
      >
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} keyboardVerticalOffset={12} behavior={'padding'}>
          <Input
            editable={!selectedState}
            style={styles.input}
            ref={inputRef}
            onChangeText={handleSearch}
            onSubmitEditing={handleInputSubmit}
          />
          <View style={styles.lists}>
            <StatesList
              style={styles.list}
              data={originalData}
              onItemSinglePress={handleItemPress}
              onItemDoublePress={handleItemDoublePress}
            />
            <StatesList
              style={styles.list}
              data={modifiedData}
              onItemSinglePress={handleItemPress}
              onItemDoublePress={handleItemDoublePress}
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      {selectedState && <Modal state={selectedState} onClose={() => setSelectedState(null)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  wrapper: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#b89881',
  },
  keyboardAvoidingView: {
    flex: 1,
    rowGap: 20,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
  input: { elevation: 5 },
  lists: {
    flex: 1,
    columnGap: 10,
    borderRadius: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  list: { flex: 1 },
});
