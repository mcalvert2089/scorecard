<?php
namespace Tests\Feature;

use App\Player;
use App\Position;
use App\Team;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PlayerTest extends TestCase
{
	use DatabaseTransactions;
	private $user;

    public function setUp() {
        parent::setUp();
        $this->user = $this->getUser();
    }

    /** @test */
    public function user_can_retrieve_all_players()
    { 
        $players = factory(Player::class, 10)->create();

        $response = $this->actingAs($this->user, 'api')
            ->get('/api/players');
        $response->assertStatus(200);

        $this->assertCount(10, $response->json());
    }

    /** @test */
    public function user_can_retrieve_a_single_player()
    { 
    	$player = factory(Player::class)->create();

    	$response = $this->actingAs($this->user, 'api')
    		->get('/api/players/' . $player->id);
    	$response->assertStatus(200);

    	$this->assertNotNull($response->json());
    }
    
    /** @test */
    public function user_can_create_a_player()
    {   
    	$team = factory(Team::class)->create();
        $position = Position::first();

    	$data = [];
    	$data['first_name'] = 'Shoeless Joe';
    	$data['last_name'] = 'Jackson';
    	$data['team_id'] = $team->id;
    	$data['user_id'] = $this->user->id;
        $data['primary_position_id'] = $position->id;
    	$data['bats'] = 'L';
    	$data['throws'] = 'R';

    	$response = $this->actingAs($this->user, 'api')
    		->post('/api/players', $data);
    	$response->assertStatus(200);

    	$this->assertDatabaseHas('players', $data);
    }

    /** @test */
    public function user_can_update_a_player()
    {   
    	$team = factory(Team::class)->create();
    	$player = factory(Player::class)->create([
    		'user_id' => $this->user->id
    	]);

    	$data = [];
    	$data['first_name'] = 'Shoeless Joe';
    	$data['last_name'] = 'Jackson';
    	$data['team_id'] = $team->id;
    	$data['user_id'] = $this->user->id;
    	$data['bats'] = 'L';
    	$data['throws'] = 'R';

    	$response = $this->actingAs($this->user, 'api')
    		->patch('/api/players/' . $player->id, $data);
    	$response->assertStatus(200);

    	$player = Player::first();

    	$this->assertDatabaseHas('players', $data);
    }

    /** @test */
    public function user_can_soft_delete_a_player()
    {   
    	$player = factory(Player::class)->create([
    		'user_id' => $this->user->id
    	]);

    	$response = $this->actingAs($this->user, 'api')
    		->delete('/api/players/' . $player->id);
    	$response->assertStatus(200);

    	$this->assertSoftDeleted('players', $player->toArray());
    }
}