import { Navigation } from '@toolpad/core/AppProvider';

// Extend the Navigation type by adding a new element
interface ExtendedNavigation extends Navigation {
    component: JSX.Element; // Example of the new element
}
