import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';

const oldStyles = {

    'app-label': {
        root: {
            alignSelf: 'auto'
        }
    },
    'app-search': {
        text: {
            height: 48,
            minHeight: 0,
            paddingLeft: 12,
            paddingRight: 12,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
        },
        focusedText: {
            borderBottomLeftRadius: 0,
        },
        searchButton: {
            root: {
                height: 48,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
            },
            icon: {
                icon: {
                    marginRight: 0,
                },
            },
        },
    },
    'app-message': {
        closeBtn: {
            paddingRight: 8,
        },
    },
    'app-anchor': {
        text: {
            paddingRight: 0,
        },
    },
    'app-popover': {
        link: {
            text: {
                paddingRight: 0,
            },
        },
        popover: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },
        modalContent: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },
    },
    'app-select': {
        arrowButton: {
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
        }
    },
    'app-alertdialog': {
        okButton: {
            root: {
                width: '100%',
                borderRadius: 4,
            },
        },
    },
    'app-buttongroup': {
        root: {
            overflow: 'hidden'
        }

    },
    'app-barcodescanner': {
        button: {
            root: {
                minheight: 0
            },
            icon: {
                icon: {
                    paddingLeft: 8,
                    fontsize: 24
                },
            },
        },
    },
    'app-camera': {
        button: {
            root: {
                minheight: 0,
                borderRadius: 0,
            },
            icon: {
                icon: {
                    paddingLeft: 8,
                },
            },
        },
    },
    'app-confirmdialog': {
        okButton: {
            root: {
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 0,
            },
        },
        cancelButton: {
            root: {
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 0,
                marginRight: 8,
            },
        },
    },
    'app-dialog': {
        root: {
            borderRadius: 6,
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 24,
            paddingRight: 24,
            elevation: 6,
        },
        icon: {
            text: {
                fontSize: 20,
            },
        },
        headerLabel: {
            paddingBottom: 0,
        },
        closeBtn: {
            root: {
                paddingTop: 8,
                paddingRight: 8,
                paddingBottom: 8,
                paddingLeft: 8,
            },
        },
    },
    'app-text': {
        root: {
            paddingTop: 12,
            paddingRight: 12,
            paddingBottom: 12,
            paddingLeft: 12,
        },
    },
    'app-number': {
        root: {
            paddingTop: 12,
            paddingRight: 12,
            paddingBottom: 12,
            paddingLeft: 12,
        },
    },
    'app-currency': {
        label: {
            marginTop: 0,
            marginBottom: 0,
        },
    },
    'app-icon': {
        icon: {
            paddingRight: 0
        }
    },
    'app-button': {
        root: {
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 12,
            paddingRight: 12,
            borderRadius: 6,
            height: null
        },
        text: {
            fontSize: 16,
            marginHorizontal: 4
        },
        badge: {
            top: -16,
            marginLeft: -16,
            marginRight: null,
            bottom: null,
            borderWidth: 1
        },
        icon: {
            root: {
                paddingLeft: 0,
                paddingRight: 0,
                alignSelf: 'auto'
            },
        },
    },

    'app-progress-bar': {
        progressBar: {
            height: 2,
        },
    },
    'app-spinner': {
        text: {
            fontSize: 14,
        },
        icon: {
            text: {
                fontSize: 24,
            },
        },
    },
    'app-slider': {
        thumb: {
            height: 16,
            width: 16,
            marginTop: -18,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center'
        }
    },
    'app-tabheader': {
        header: {
            paddingTop: 0,
            paddingBottom: 0,
        },
        headerIcon: {
            icon: {
                fontSize: 16,
            },
        },
        headerText: {
            fontWeight: 'bold',
            fontSize: 16,
            paddingTop: 16
        },
        activeIndicator: {
            height: 4,
            marginTop: -4
        },
    },
    'app-wizard': {
        stepIcon: {
            root: {
                paddingLeft: 0
            }
        },
        wizardFooter: {
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 12,
            paddingRight: 12,
            marginLeft: 0,
        },
    },
    'app-list': {
        listIcon: {
            root: {
                marginTop: 4,
            },
        },
        subheading: {
            text: {
                fontSize: 12,
                lineHeight: 16,
            },
        },
        item: {
            minHeight: 0,
        },
    },
    'app-vertical-list': {
        item: {
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
            flexGrow: null,
            flexShrink: null,
            flexBasis: null
        }
    },
    'app-chips': {
        chip: {
            borderRadius: 500,
            minHeight: 40,
        },
    },
    'app-fileupload': {
        root: {
            borderRadius: 6,

        }
    },
    'app-switch': {
        button: {
            fontSize: 16,
            minHeight: 0,
            borderRadius: 0,
            fontWeight: 'bold',
        },
    },
    'app-switch-first-btn': {
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6
    },
    'app-switch-last-btn': {
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6

    },
    'app-toggle': {
        root: {
            width: 36,
            height: null,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 18,
            borderWidth: 1,
            animation: 'none'
        },
        handle: {
            width: 18,
            height: 18,
            borderRadius: 18,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center'
        }
    },
    'app-toggle-on': {
        root: {
            justifyContent: 'flex-end'
        },
        handle: {
            width: 18,
            height: 18,
            marginLeft: 0,
            marginRight: 0,
            borderRadius: 18,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
        },
    },
    'app-toggle-off': {
        handle: {
            width: 18,
            height: 18,
            marginLeft: 0,
            marginRight: 0,
            borderRadius: 18,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
        },
    },
    'app-tabbar': {
        root: {
            height: 88
        },
        tabItem: {
            minWidth: 60,
            opacity: 0.4,
            marginBottom: 0,
            paddingBottom: 14
        },
        activeTabItem: {
            backgroundColor: 'transparent',
            height: null,
            borderRadius: 0,
            marginBottom: 0
        },
        tabLabel: {
            fontSize: 14,
            marginTop: -32,
            textAlign: 'center',
        },
        tabIcon: {
            icon: {
                fontSize: 36
            },
            root: {
                paddingBottom: 32,
                borderBottomWidth: 4,
                zIndex: 1
            },
        },
    },
    'app-menu': {
        menu: {
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 12,
            paddingRight: 12,
            borderRadius: 6,
        },
        menuItem: {
            root: {
                width: '100%',
                paddingTop: 8,
                paddingRight: 8,
                paddingBottom: 8,
                paddingLeft: 8,
            },
            icon: {
                root: {
                    fontSize: 16,
                },
            },
        },
    },
    'app-navitem': {
        root: {
            borderWidth: 0,
            borderBottomWidth: 1,
            borderStyle: 'solid',
        },
        navAnchorItem: {
            text: {
                fontSize: 18,
                fontWeight: '400',
            },
            icon: {
                text: {
                    fontSize: 16,
                },
            },
        },
    },
    'app-navitem-active': {
        text: {
            fontSize: 18,
            fontWeight: 'bold',
        },
    },
    'app-navitem-child': {
        text: {
            textDecorationLine: 'underline',
            textDecorationColor: 'black',
            textDecorationStyle: 'solid',
        },
    },
    'app-left-panel': {
        root: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        },
    }
};
export const resetTheme = (theme) => {
    const overrideTheme = BASE_THEME.$new('material3-override', oldStyles);
    let target = theme;

    while (target.parent.name !== 'default' && target.parent.name !== 'material3-override') {
        target = target.parent;
    }

    target.parent = overrideTheme;
};