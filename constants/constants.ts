export enum BACKEND_URL {
    LOCALHOST = "http://localhost:8080/api/v1/data",
    BY_IP = "http://192.168.0.101:8080/api/v1/data",
    BY_IP_AT_NOVA_CEREKEV = "http://192.168.0.107:8080/api/v1/data"
}

export const ACTIVE_BACKEND_URL = BACKEND_URL.LOCALHOST;

export enum SCREEN {
    LOGIN = "Login",
    LIST_OF_PHOTOS = "ListOfPhotos",
    MENU = "Menu",
    CAPTURE_PHOTO = "CapturePhoto"
}

export enum TITLE {
    LOGIN_SCREEN = "Login screen",
    LIST_OF_PHOTOS = "List Of Photos",
    MENU = "Menu",
    CAPTURE_PHOTO = "Capture photo"
}

export interface RootStackParamList {
    [key: string]: undefined;
    // Define parameters for each screen, ensuring appropriate types
    [SCREEN.LOGIN]: undefined; // No expected parameters for Login screen
    [SCREEN.LIST_OF_PHOTOS]: undefined// Object for ListOfPhotos parameters
    [SCREEN.MENU]: undefined; // No expected parameters for Menu screen
    [SCREEN.CAPTURE_PHOTO]: undefined; // No expected parameters for CapturePhoto screen
}

export const colors = {
    primary: "#6200ee",
    secondary: "#03dac6",
    background: "#121212",
    surface: "#1e1e1e",
    error: "#cf6679",
    onPrimary: "#ffffff",
    onSecondary: "#000000",
    onBackground: "#ffffff",
    onSurface: "#ffffff",
    onError: "#000000",
    grey: "#757575",
    lightGrey: "#b0b0b0",
    darkGrey: "#2F2E30",
    darkWhite: "#ddd",
    lightBlue: "#0ef",
}
