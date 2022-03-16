<script context="module">
  import { Search } from '$api/api';

  export async function load({ params }) {
    const { personid } = params;
    const personData = await Search.getPerson(personid);
    return {
      props: {
        personData
      }
    };
  }
  // query for isFavorite
</script>

<script lang="ts">
  import type { PersonType, PersonCastType } from '$models/person.interface';

  export let personData: PersonType;

  import Bio from '$lib/person/Bio.svelte';
  import Details from '$lib/person/Details.svelte';
  import KnownFor from '$lib/person/KnownFor.svelte';
  import ProfileImage from '$lib/person/ProfileImage.svelte';

  const {
    name,
    birthday,
    biography,
    profile_path,
    imdb_id,
    combined_credits: { cast }
  } = personData;

  // isFavorite
  let isFavorite: boolean = false;

  // BIRTHYEAR
  function getYear(date: string | null): string {
    return date === null ? '' : date.split('-')[0];
  }
  const birthyear = getYear(birthday);

  // CREDITS
  const credits_to_display: number = 8;

  function getKnownForCredits(cast: PersonCastType[]): PersonCastType[] {
    const credits_sorted_by_vote_count = cast.sort((a, b) => b.vote_count - a.vote_count);
    const top_credits = credits_sorted_by_vote_count.slice(0, credits_to_display);
    return top_credits;
  }

  const top_credits: PersonCastType[] = getKnownForCredits(cast);
</script>

<svelte:head>
  <title>
    {`${name} | Popcorn`}
  </title>
</svelte:head>

<div class="person_container">
  <div class="person_details">
    <Details {name} {birthyear} {imdb_id} {isFavorite} />
    <Bio {biography} />
    <KnownFor {top_credits} />
  </div>
  <div class="person_img">
    <ProfileImage {profile_path} {name} />
  </div>
</div>

<style>
  .person_container {
    padding-bottom: 4em;
    display: flex;
    flex-direction: column;
  }

  .person_container .person_details {
    padding: 0.25em 1.5em 0;
    display: flex;
    flex-direction: column;
    gap: 0.75em;
  }

  .person_container .person_img {
    padding: 1em 1.5em;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .person_container {
      padding-right: 3em;
      padding-left: 3em;
    }
  }

  @media (min-width: 1025px) {
    .person_container {
      padding-right: 4em;
      padding-left: 4em;
      flex-direction: row;
    }

    .person_container .person_details {
      width: 65%;
    }

    .person_container .person_img {
      width: 35%;
    }
  }
</style>
