import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useState } from "react"
import { supabase } from "@/utils/supabase";

// const [userId, setUserID] = useState("");
export default function() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEBCLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    // hostedDomain: "", // specifies a hosted domain restriction
    // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    // accountName: "", // [Android] specifies an account name on the device that should be used
    // iosClientId: "<FROM DEVELOPER CONSOLE>", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    // googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    // openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error(error);
    }
  };
  return (
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={
          async () => {
            try {
              await GoogleSignin.hasPlayServices();
              const userInfo = await GoogleSignin.signIn();
              // setState({ userInfo, error: undefined });
              console.log(JSON.stringify(userInfo, null, 2))
              if(userInfo.idToken){
                const {/* data, error */} = await supabase.auth.signInWithIdToken({
                  'provider': 'google',
                  'token': userInfo.idToken
                });
                // console.log(error, data);
                console.log("User signed in");
              }else {throw new Error('no id token present')}

            } catch (error: any) {
              if(error.code === statusCodes.SIGN_IN_CANCELLED){
                    // user cancelled the login flow
                console.log("sign in cancelled");
              } else if (error.code === statusCodes.IN_PROGRESS){
                    // operation (eg. sign in) already in progress
                console.log("in progress");
              } else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
                    // play services not available or outdated
                console.log("play services not available");
              }else{
                  // some other error happened
                console.log("some other error happened");
              }
            }
          }
        }
        // disabled={isInProgress}
      />
  );
}
