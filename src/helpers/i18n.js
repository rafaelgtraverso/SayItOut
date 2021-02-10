import * as RNLocalize from 'react-native-localize';

const locale = RNLocalize.getCountry().toLowerCase();

export const t = locale.includes('it') ? require('../i18n/it/main.json') : require('../i18n/en/main.json');