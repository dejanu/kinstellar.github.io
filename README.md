## itmapper

Your own AI interview assistant, tl;dr motivation [here](https://dejanualex.medium.com/reshaping-the-job-market-5be1b4afab01)

Page accessible at: [itmapper](https://itmapper.github.io)

### Architecture

Static single-page app: everything runs in the browser; there is no backend in this repo.

```mermaid
flowchart LR
  subgraph host [Hosting]
    GH[GitHub Pages]
  end
  subgraph browser [User browser]
    HTML[index.html]
    UI[Setup / Q&A / Summary UI]
    CFG[INTERVIEW_CONFIG + state]
    FETCH[callOpenAI]
    HTML --> UI
    HTML --> CFG
    CFG --> FETCH
    FETCH --> UI
  end
  GH -->|serves| HTML
  FETCH -->|POST /v1/chat/completions| OAI[(OpenAI API)]
```

- **index.html** bundles markup, inline CSS, and interview logic.
- The OpenAI **API key** is supplied in the form at runtime and sent only from the browser to OpenAI (not stored by this site).
