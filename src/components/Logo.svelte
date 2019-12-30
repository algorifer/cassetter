<style>
  @keyframes logo {
    0% {
      stroke: var(--b_med);
    }

    50% {
      stroke: var(--b_inv);
    }

    100% {
      stroke: var(--b_med);
    }
  }

  h1 {
    width: 100%;
    font-size: inherit;
    margin: 0;
    text-align: center;
  }

  svg {
    max-width: 300px;
    margin-bottom: 20px;
  }

  path {
    animation-name: logo;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
  }

  span {
    color: var(--f_med);
    margin-bottom: 40px;
  }
</style>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  baseProfile="full"
  viewBox="0 0 360 200">
  <path
    stroke="#fff"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="15"
    d="M60 120a60 60 0 0160-60 60 60 0 0160 60 60 60 0 01-60 60 60 60 0
    01-60-60m180 30a30 30 0 0130-30 30 30 0 0130 30 30 30 0 01-30 30 30 30 0
    01-30-30m-120 30h150m-120" />
</svg>
<span>MIDI controlled granular sampler</span>
