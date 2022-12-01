
// Initialize the invite cache
const invites = new Collection();

// A pretty useful method to create a delay without blocking the whole script.
const wait = require("timers/promises").setTimeout;

client.on("ready", async () => {
  // "ready" isn't really ready. We need to wait a spell.
  await wait(1000);

  // Loop over all the guilds
  client.guilds.cache.forEach(async (guild) => {
    // Fetch all Guild Invites
    const firstInvites = await guild.invites.fetch();
    // Set the key as Guild ID, and create a map which has the invite code, and the number of uses
    invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
  });
});

client.on("inviteDelete", (invite) => {
    // Delete the Invite from Cache
    invites.get(invite.guild.id).delete(invite.code);
  });
  
  client.on("inviteCreate", (invite) => {
    // Update cache on new invites
    invites.get(invite.guild.id).set(invite.code, invite.uses);
  });

  client.on("guildCreate", (guild) => {
    // We've been added to a new Guild. Let's fetch all the invites, and save it to our cache
    guild.invites.fetch().then(guildInvites => {
      // This is the same as the ready event
      invites.set(guild.id, new Map(guildInvites.map((invite) => [invite.code, invite.uses])));
    })
  });
  
  client.on("guildDelete", (guild) => {
    // We've been removed from a Guild. Let's delete all their invites
    invites.delete(guild.id);
  });

  client.on("guildMemberAdd", async (member) => {
    // To compare, we need to load the current invite list.
    const newInvites = await member.guild.invites.fetch()
    // This is the *existing* invites for the guild.
    const oldInvites = invites.get(member.guild.id);
    // Look through the invites, find the one for which the uses went up.
    const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = await client.users.fetch(invite.inviter.id);
    // Get the log channel (change to your liking)
    const logChannel = member.guild.channels.cache.find(channel => channel.name === "a");
    // A real basic message with the information we need. 


    const cargo = member.guild.roles.cache.get(`993754209243627600`) 

        if (!cargo) return


    if(invite.code == `kyD7JXcjfC`){ inviter
        ? logChannel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`)
        : logChannel.send(`${member.user.tag} joined but I couldn't find through which invite.`);
    
        member.roles.add(cargo)
        
        }   
  });