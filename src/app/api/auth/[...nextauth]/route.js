import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import createConnection from '@/utils/connection';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
        // ...add more providers here
      ],
      pages: {
        signIn:"/signin"
      },
      callbacks:{
        async signIn({ user, account, profile, email, credentials }) {
          const connection = await createConnection();
          const whereClause= `SELECT * FROM \`pickups_users\` WHERE email='${user.email}'`;
          
          
          const [rows, fields] = await connection.execute(whereClause);
          
          if(!rows || rows.length === 0){
            const {
              id,
              email,
              image,
            } = user
            
            const {given_name, family_name} = profile;
            const {provider} = account;

            const insertStatement  =`INSERT INTO \`pickups_users\` (\`first_name\`, \`last_name\`, \`email\`, \`image\`, \`provider_user_id\`, \`provider\`)
             VALUES ( '${given_name}', '${family_name}', '${email}', '${image}', '${provider}-${id}', '${provider}');`
          
            await connection.execute(insertStatement);
            
          }
          return true
        },
      }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }