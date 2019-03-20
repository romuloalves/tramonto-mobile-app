import { AsyncStorage } from 'react-native';

const KEY = 'tests';

export async function addTest(data) {
  let tests = [];
  const stringedTests = await AsyncStorage.getItem(KEY);

  if (stringedTests) {
    const jsonTests = JSON.parse(stringedTests);

    tests = jsonTests;
  }

  tests.unshift(data);

  await AsyncStorage.setItem(KEY, JSON.stringify(tests));
}

export async function getTests() {
  const stringedTests = await AsyncStorage.getItem(KEY);

  if (stringedTests) {
    const tests = JSON.parse(stringedTests);

    return tests;
  }

  return [];
}