<?php

namespace Tests\Feature;

use App\Player;
use App\Scorecard;
use App\ScorecardRoster;
use App\Team;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ScorecardTest extends TestCase
{
    use DatabaseTransactions;
    
    private $user;

    public function setUp() {
        parent::setUp();
        $this->user = $this->getUser();
        $this->teams = Team::all();
    }

    /** @test */
    public function user_can_retrieve_their_scorecards()
    {
        $scorecards = factory(Scorecard::class, 10)->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->actingAs($this->user, 'api')
                        ->get('/api/scorecard');
        $response->assertStatus(200);

        $this->assertCount(10, $response->json());
    }

    /** @test */
    public function user_can_create_a_blank_scorecard()
    {
        $data = [];

        $data['home_team_id'] = $this->teams[0]->id;
        $data['visiting_team_id'] = $this->teams[1]->id;
        $data['user_id'] = $this->user->id;
        $data['game_date'] = date('Y-m-d');

        $response = $this->actingAs($this->user, 'api')
                        ->post('/api/scorecard', $data);
        $response->assertStatus(201);

        $this->assertDatabaseHas('scorecards', $data);
    }

    /** @test */
    public function user_can_retrieve_mlb_scorecard_rosters()
    {
        $scorecard = factory(Scorecard::class)->create();
        
        $response = $this->actingAs($this->user, 'api')
            ->get("/api/scorecard-rosters/$scorecard->id");
        $response->assertStatus(200);

        $this->assertCount(9, $response->json('home_roster'));
        $this->assertCount(9, $response->json('visiting_roster'));
    }

    /** @test */
    public function user_can_create_a_scorecard_roster()
    {
        $data = [];
        $homeTeamId = $this->teams[0]->mlb_org_id;
        $visitingTeamId = $this->teams[1]->mlb_org_id;

        $scorecard = factory(Scorecard::class)->create([
            'home_team_id' => $homeTeamId,
            'visiting_team_id' => $visitingTeamId,
            'user_id' => $this->user->id,
            'game_date' => date('Y-m-d h:i:s')
        ]);

        $homePlayers = Player::whereTeamId($homeTeamId)->limit(9)->get();
        $visitingPlayers = Player::whereTeamId($visitingTeamId)->limit(9)->get();

        $startingPitcherHome = Player::whereTeamId($homeTeamId)
                                    ->wherePrimaryPosition('1')
                                    ->first();

        $startingPitcherVisiting = Player::whereTeamId($visitingTeamId)
                                    ->wherePrimaryPosition('1')
                                    ->first();

        foreach($homePlayers as $key => $p) {
            $player['scorecard_id'] = $scorecard->id;
            $player['team_id'] = $p->team_id;
            $player['player_id'] = $p->id;
            $player['position'] = $p->primary_position;
            $player['batting_order'] = $key + 1;

            $home[] = $player;
        }

        foreach($visitingPlayers as $key => $p) {
            $player['scorecard_id'] = $scorecard->id;
            $player['team_id'] = $p->team_id;
            $player['player_id'] = $p->id;
            $player['position'] = $p->primary_position;
            $player['batting_order'] = $key + 1;

            $visiting[] = $player;
        }

        $data = [ 
                    'scorecard_id' => $scorecard->id, 
                    'active' => 1, 
                    'scorecard_roster_home' => $home, 
                    'scorecard_roster_visiting' => $visiting,
                    'starting_pitcher_home' => $startingPitcherHome,
                    'starting_pitcher_visiting' => $startingPitcherVisiting
                ];

        $response = $this->actingAs($this->user, 'api')
             ->post('/api/roster', $data);
        $response->assertOk();

        $roster = ScorecardRoster::get();

        $this->assertNotNull($roster);
        $this->assertDatabaseHas('scorecard_pitchers', [
            'scorecard_id' => $scorecard->id,
            'player_id' => $startingPitcherHome->player_id,
            'team_id' => $startingPitcherHome->team_id,
            'scorecard_order' => 1
          ]);

        $this->assertDatabaseHas('scorecard_pitchers', [
            'scorecard_id' => $scorecard->id,
            'player_id' => $startingPitcherVisiting->player_id,
            'team_id' => $startingPitcherVisiting->team_id,
            'scorecard_order' => 1
        ]);
    }
}
