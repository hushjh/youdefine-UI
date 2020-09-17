import YnActionSheet from "./yn-action-sheet";
import YnButton from "./yn-button";
import YnCalendar from "./yn-calendar";
import YnCheckbox from "./yn-checkbox";
import YnCityPicker from "./yn-city-picker";
import YnCounter from "./yn-counter";
import YnDatePicker from "./yn-date-picker";
import YnDialog from "./yn-dialog";
import YnDropdownMenu from "./yn-dropdown-menu";
import YnDropdownMenuItem from "./yn-dropdown-menu-item";
import YnField from "./yn-field";
import YnFieldGroup from "./yn-field-group";
import YnFlex from "./yn-flex";
import YnFlexItem from "./yn-flex-item";
import YnHeader from "./yn-header";
import YnIconfont from "./yn-iconfont";
import YnIndicator from "./yn-indicator";
import YnLayout from "./yn-layout";
import YnPicker from "./yn-picker";
import YnPickyStepper from "./yn-picky-stepper";
import YnPopup from "./yn-popup";
import YnPullRefresh from "./yn-pull-refresh";
import YnRadiobox from "./yn-radiobox";
import YnSlider from "./yn-slider";
import YnSpin from "./yn-spin";
import YnSticky from "./yn-sticky";
import YnSubmitAction from "./yn-submit-action";
import YnSubmitActionPopupContent from "./yn-submit-action-popup-content";
import YnSubmitActionValue from "./yn-submit-action-value";
import YnSwipe from "./yn-swipe";
import YnSwipeItem from "./yn-swipe-item";
import YnTabItem from "./yn-tab-item";
import YnTabs from "./yn-tabs";
import YnToast from "./yn-toast";


function install(Vue) {
  const components = [YnActionSheet,YnButton,YnCalendar,YnCheckbox,YnCityPicker,YnCounter,YnDatePicker,YnDialog,YnDropdownMenu,YnDropdownMenuItem,YnField,YnFieldGroup,YnFlex,YnFlexItem,YnHeader,YnIconfont,YnIndicator,YnLayout,YnPicker,YnPickyStepper,YnPopup,YnPullRefresh,YnRadiobox,YnSlider,YnSpin,YnSticky,YnSubmitAction,YnSubmitActionPopupContent,YnSubmitActionValue,YnSwipe,YnSwipeItem,YnTabItem,YnTabs,YnToast];
  components.forEach(function (item) {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install };
export { install, YnActionSheet, YnButton, YnCalendar, YnCheckbox, YnCityPicker, YnCounter, YnDatePicker, YnDialog, YnDropdownMenu, YnDropdownMenuItem, YnField, YnFieldGroup, YnFlex, YnFlexItem, YnHeader, YnIconfont, YnIndicator, YnLayout, YnPicker, YnPickyStepper, YnPopup, YnPullRefresh, YnRadiobox, YnSlider, YnSpin, YnSticky, YnSubmitAction, YnSubmitActionPopupContent, YnSubmitActionValue, YnSwipe, YnSwipeItem, YnTabItem, YnTabs, YnToast };
