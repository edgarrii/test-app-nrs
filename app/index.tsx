import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Input } from '@/components/Input';
import { StateDetails } from '@/components/StateDetails';
import { StatesList } from '@/components/StatesList';
import { useBackHandler } from '@/hooks/useBackHandler';
import { useListData } from '@/hooks/useListData';
import { State } from '@/types/types';

export default function HomeScreen() {
  const { top, bottom } = useSafeAreaInsets();

  const [search, setSearch] = useState('');
  const [highlightedStates, setHighlightedStates] = useState<string[]>([]);

  const { originalData, modifiedData, isLoading, isError } = useListData(search, highlightedStates);

  const [selectedState, setSelectedState] = useState<State | null>(null);

  const inputRef = useRef<TextInput>(null);

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const handleItemPress = useCallback(
    (state: State) => {
      if (selectedState?.state !== state.state) {
        setSelectedState(state);
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

  useBackHandler(() => {
    hideKeyboard();
  });

  useEffect(() => {
    if (!isLoading && originalData.length > 0) {
      setSelectedState(originalData[0]);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View style={[styles.wrapper, styles.centerContent]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (isError || (!isLoading && !isError && originalData.length === 0)) {
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
          <Input style={styles.input} ref={inputRef} onChangeText={handleSearch} onSubmitEditing={handleInputSubmit} />
          <View style={styles.lists}>
            <StatesList
              style={styles.content}
              data={originalData}
              onItemSinglePress={handleItemPress}
              onItemDoublePress={handleItemDoublePress}
            />
            <StatesList
              style={styles.content}
              data={modifiedData}
              onItemSinglePress={handleItemPress}
              onItemDoublePress={handleItemDoublePress}
            />
            {selectedState && <StateDetails style={styles.content} state={selectedState} />}
          </View>
        </KeyboardAvoidingView>
      </View>
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
    columnGap: 6,
    borderRadius: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  content: { flex: 1 },
});
