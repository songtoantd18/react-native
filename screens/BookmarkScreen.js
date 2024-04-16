import React,{useRef} from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const BookmarkScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const webViewRef = useRef();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    webViewRef.current.reload();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);
    return (
      <View style={styles.container}>
      <ScrollView
        style = {styles.ScrollStyle}
        contentContainerStyle={{flex: 1}}
        refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={onRefresh} 
            />
        }>
        <WebView
          ref = {webViewRef}
          automaticallyAdjustContentInsets={false}
          source={{ uri: 'https://docs.google.com/gview?embedded=true&url=http://epur.unicjsc.com/static/eprc/guidelines/EBidding_Guideline_Approval_v2.0.pdf' }} 
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          style={styles.container}
        />
    </ScrollView>
    </View>
    );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});
