<?php

namespace Tests\Feature;

use App\Player;
use App\Scorecard;
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
        $this->teams = factory(Team::class, 2)->create();
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
    public function user_can_create_a_scorecard_roster()
    {
        $data = [];

        $scorecard = factory(Scorecard::class)->create([
            'home_team_id' => $this->teams[0]->id,
            'visiting_team_id' => $this->teams[1]->id,
            'user_id' => $this->user->id,
            'game_date' => date('Y-m-d h:i:s')
        ]);

        $players = factory(Player::class, 9)->create();

        foreach($players as $p) {
            $player = [];
            $player['scorecard_id'] = $scorecard->id;
            $player['team_id'] = $p->team_id;
            $player['player_id'] = $p->id;
            $player['position'] = $p->primary_position_id;
            $player['batting_order'] = 1;
            $player['position_order'] = 1;

            $data[] = $player;
        }

        $response = $this->actingAs($this->user, 'api')
             ->post('/api/roster/create', $data);
        $response->assertOk();

        $this->assertDatabaseHas('scorecard_rosters', $data[0]);
    }
}
