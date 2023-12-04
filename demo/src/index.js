import c from 'c-tiny';

const EMOJIS = ['\u{1F386}', '\u{1F973}', '\u{1F51C}'];

function createEmoji(emoji) {
    return c(
        'div',
        {
            class: 'emoji',
            $duration: Math.random() * 1500 + 500,
            _click: e => e.target.animate(
                [
                    { transform: 'rotate(0) scale(1)' },
                    { transform: 'rotate(360deg) scale(0)' },
                ],
                {
                    duration: e.target.duration,
                    iterations: 1
                }
            )
        },
        emoji
    )
}

c(
    document.body,
    {
        style: 'color: white; background: black; text-align: center; font-family: sans-serif;'
    },
    c(
        'h1',
        { class: 'primary' },
        c('code', null, 'c-tiny'), ' Demo!'
    ),
    c(
        'div',
        { class: 'emoji-cnt' },
        ...EMOJIS.map(createEmoji)
    ),
    c('div', null, '(click above)')
);
