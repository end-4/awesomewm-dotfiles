const { App, Widget } = ags;

const awesomebutton = Widget.Button({
    halign: 'center',
    valign: 'center',
    className: 'awesome-butt',
});

const hyprClients = Widget.Box({
    orientation: 'h',
    homogeneous: true,
    hexpand: true,
    connections: [[
        ags.Service.Hyprland, box => {
            box.get_children().forEach(ch => ch.destroy());
            ags.Service.Hyprland.clients.forEach(client => {
                if (client.class == '' || client.workspace.id != ags.Service.Hyprland.active.workspace.id) return;
                box.add(Widget.Box({
                    children: [
                        Widget.Icon({
                            valign: 'center',
                            className: 'app-icon',
                            icon: client.class,
                            size: 30,
                        }),
                        Widget.Scrollable({
                            hscroll: 'always',
                            vscroll: 'never',
                            hexpand: true,
                            child: Widget.Label({
                                xalign: 0,
                                label: client.title,
                            })
                        })
                    ]
                }));
            })
            box.show_all();
        }
    ]]
});

const clock = Widget.Label({
    className: 'clock',
    connections: [[1000, label => label.label = ags.Utils.exec('date "+%H:%M"').trim()]],
});

const bar = Widget.Window({
    name: 'bar',
    anchor: ['bottom', 'left', 'right'],
    exclusive: true,
    child: Widget.Box({
        className: 'bar',
        children: [
            awesomebutton,
            hyprClients,
            clock,
        ]
    }),
});

const solidBg = Widget.Window({
    name: 'solidBg',
    anchor: ['bottom', 'left', 'right', 'top'],
    layer: 'bottom',
    exclusive: false,
    child: Widget.Box({
        className: 'bg',
    }),
});

// exporting the config
export default {
    style: `${App.configDir}/style.css`,
    windows: [bar, solidBg],
};
