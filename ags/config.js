const awesomebutton = {
    halign: 'center',
    valign: 'center',
    type: 'button',
    className: 'awesome-butt',
}

const hyprClients = {
    type: 'box',
    orientation: 'h',
    homogeneous: true,
    hexpand: true,
    connections: [[
        ags.Service.Hyprland, box => {
            box.get_children().forEach(ch => ch.destroy());
            ags.Service.Hyprland.clients.forEach(client => {
                if (client.class == '' || client.workspace.id != ags.Service.Hyprland.active.workspace.id) return;
                box.add(ags.Widget({
                    // One app goes here
                    type: 'box',
                    children: [
                        {
                            type: 'icon',
                            valign: 'center',
                            className: 'app-icon',
                            icon: client.class,
                            size: 30,
                        },
                        {
                            type: 'scrollable',
                            hscroll: 'always',
                            vscroll: 'never',
                            hexpand: true,
                            child: {
                                type: 'label',
                                xalign: 0,
                                label: client.title,
                            }
                        }
                    ]
                }));
            })
            box.show_all();
        }
    ]]
};

const clock = {
    type: 'label',
    className: 'clock',
    connections: [[1000, label => label.label = ags.Utils.exec('date "+%H:%M"').trim()]],
};

const bar = {
    name: 'bar',
    anchor: ['bottom', 'left', 'right'],
    exclusive: true,
    child: {
        type: 'box',
        className: 'bar',
        children: [
            awesomebutton,
            hyprClients,
            clock,
        ]
    },
}

const solidBg = {
    name: 'solidBg',
    anchor: ['bottom', 'left', 'right', 'top'],
    layer: 'bottom',
    exclusive: false,
    child: {
        type: 'box',
        className: 'bg',
    },
}

// exporting the config
var config = {
    style: ags.Utils.CONFIG_DIR + '/style.css',
    windows: [bar, solidBg],
};
