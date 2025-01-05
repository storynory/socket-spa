<script>
    import PocketBase from 'pocketbase';
    import { goto } from '$app/navigation';
    import SocketIcon from '$lib/components/icons/socket.svelte'

    const pb = new PocketBase('https://content.socketcms.com');
    let username = '';
    let password = '';
    let errorMessage = ''; // Variable to store error message

    async function login() {
        try {
            await pb.collection('users').authWithPassword(username, password);
           
            goto('/socket/dashboard');
        } catch (err) {
          
            errorMessage = 'Invalid username or password. Please try again.'; // Set error message
        }
    }

  
</script>

<form class='form' onsubmit={(e) => { e.preventDefault(); login(); }}>
  <header>
    <h1>Plugin to Socket CMS</h1>
    <SocketIcon />
  </header>


    <div>
        <label class="label" for="username">Username</label>
        <input class="input" id="username" type="text" bind:value={username} required />
    </div>

    <div>
        <label class="label" for="password">Password</label>
        <input class="input" id="password" type="password" bind:value={password} required />
    </div>

    {#if errorMessage}
        <p style="color: red;">{errorMessage}</p> <!-- Display error message -->
    {/if}

    <button class="btn" type="submit">
       Plugin
    </button>
</form>

<style>
header {
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>