   // musica

    const songTitle = `https://www.youtube.com/watch?v=RVDt4-IcH-8&ab_channel=CarlaHicsMusics`

    const userID = newstate.id
    const guild = newstate.guild.id
    const canal = newstate.channelId

    const searchResult = await player.search(songTitle, {
        requestedBy: Discord.Message.user,
        searchEngine: QueryType.AUTO,
    });

    const queue = await player.createQueue(guild, {
        metadata: canal,
    });

    // if (!queue.connection)
    //     await queue.connect(canal);

    await queue.connect(canal);

    searchResult.playlist
        ? queue.addTracks(searchResult.tracks)
        : queue.addTrack(searchResult.tracks[0]);

    if (!queue.playing) await queue.play();

    await queue.leaveOnEnd()