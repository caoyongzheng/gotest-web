import fetch2 from 'fetch2'

function marked2(md = '') {
  return fetch2('/utils/marked', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ md }),
  }).then(res => res.json())
}

export default marked2
