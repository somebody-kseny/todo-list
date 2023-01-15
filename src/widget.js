import {
    createMultiChatsWidget,
    buttonUIFactory,
    yandexUnreadCounterFactory,
    Deeplinker,
} from 'yandex-messenger-widget-beta';
import 'yandex-messenger-widget-beta/lib/ui/button.css';

const unreadCounterPlugin = yandexUnreadCounterFactory();

const ui = buttonUIFactory({
    unreadCounterPlugin,
});

const widget = createMultiChatsWidget({
    serviceId: -1,
    orgId: 7167300,
    flags: {
        enableWorkplace: 1,
    }
})

widget
    .addPlugin(unreadCounterPlugin)
    .addPlugin(new Deeplinker())
    .setUI(ui)
    .init()

ui.mount(document.body);

export { widget };