import createPost from './createPost';

export default async function postDegenTipComment(
  signer_uuid: string,
  degen_amount: number,
  post_hash: string,
) {
  try {
    const body = JSON.stringify({
      signer_uuid,
      text: `${degen_amount} $DEGEN`,
      parent: post_hash,
    });
    const response = await createPost(body);
    return response;
  } catch (error) {
    console.error(error);
    return { error };
  }
}
