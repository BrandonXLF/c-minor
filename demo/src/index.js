import c from 'c-tiny';

function emojiClicked(e) {
    e.target.animate(
        [
            { transform: 'rotate(0) scale(1)' },
            { transform: 'rotate(360deg) scale(0)' },
        ],
        {
            duration: e.target.duration,
            iterations: 1
        }
    )
}

c(
    document.body,
    {
        style: 'color: white; background: black; text-align: center; font-family: sans-serif;'
    },
    c(
        'h1',
        {
            class: 'primary'
        },
        c('code', null, 'c-tiny'),
        ' Demo!'
    ),
    c(
        'div',
        { class: 'emoji-cnt' },
        c(
            'div',
            {
                class: 'emoji',
                $duration: Math.random() * 1000 + 1000,
                _click: emojiClicked
            },
            '\u{1F386}'
        ),
        c(
            'div',
            {
                class: 'emoji',
                $duration: Math.random() * 1000 + 1000,
                _click: emojiClicked
            },
            '\u{1F973}'
        ),
        c(
            'div',
            {
                class: 'emoji',
                $duration: Math.random() * 1000 + 1000,
                _click: emojiClicked
            },
            '\u{1F51C}'
        )
    ),
    c('div', null, '(click above)')
);
