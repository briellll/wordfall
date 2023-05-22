import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 20,
    backgroundColor: '#3b4154',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#0ad3ab',
  },
  activeTab: {
    borderBottomColor: 'white',
  },
  tabText: {
    color: 'white',
    fontSize: 16,
  },
  scoreTable: {
    flex: 1,
  },
  tableHeader: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  columnHeader: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  scoreText: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
});
