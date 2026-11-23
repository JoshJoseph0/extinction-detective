<script>
    let useremail =$state("");
    let usercompemail=$state("")
    let useraccesscode=$state("")
    let { onBack } = $props();
</script>

<div class="desktop">

  <div class="window">
         <div class="title-bar">Afterlight Sign Up System</div>

      <div class="window-main">
        <div class="content">
          <h2>Welcome, New Investigator.</h2>
          <p>Please identify yourself.</p>
          
            <label for="username">ENTER REAL EMAIL:</label>
          <input
              id="useremail"
              bind:value={useremail}
              autocomplete="username"
              required
            /><button type="submit">Get Access</button>
              <button type="button" onclick={onBack}>Return to login</button>
          </div>
          </div>
          
      <div class="status">
        <h3>System Status: ONLINE</h3>
        <h3>Research Net : CONNECTED</h3>
      </div>
    </div>
</div>

<style>
    :global(html),
    :global(body) {
        overflow: hidden;
    }

    button{
        margin-top: 20px;
    }
</style>