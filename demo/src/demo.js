import c from '../../src/c.js';

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
    );
}

c(
    document.body,
    {
        style: 'color: white; background: black; text-align: center; font-family: sans-serif;'
    },
    c(
        'h1',
        { class: 'primary' },
        c('code', 'c-minor'), ' Demo!'
    ),
    c(
        'div',
        { class: 'emoji-cnt' },
        ...EMOJIS.map(createEmoji),
    ),
    c(
        'svg@http://www.w3.org/2000/svg',
        { viewBox: '0 0 24 6', style: 'height: 3em;' },
        c(
            'path@http://www.w3.org/2000/svg',
            {
                class: 'stylistic-path',
                d: 'M 2 2 c 6 0 3 2 10 2 6 0 3 -2 10 -2'
            }
        )
    ),
    c('div', '(click an emoji)')
);
