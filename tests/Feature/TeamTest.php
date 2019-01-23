<?php
namespace Tests\Unit;

use App\Repositories\Repository;
use App\Team;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TeamTest extends TestCase
{
	use DatabaseTransactions;

    private $user;

    public function setUp() {
        parent::setUp();
        $this->user = $this->getUser();
    }

    /** @test */
    public function user_can_retrieve_their_own_team_list()
    {   
        factory(Team::class, 10)->create();

        $userTeams = factory(Team::class, 10)->create([
            'user_id' => $this->user->id
        ]);

    	$response = $this->actingAs($this->user, 'api')
                         ->get('/api/teams');
        $response->assertStatus(200);

        $this->assertCount(10, $response->json());
    }

    /** @test */
    public function user_can_retrieve_single_team()
    { 
        $team = factory(Team::class)->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->actingAs($this->user, 'api')
                 ->get('/api/teams/' . $team->id);
        $response->assertStatus(200);

        $retrievedTeam = Team::first();

        $this->assertEquals($team->name, $retrievedTeam->name);
        $this->assertEquals($team->manager, $retrievedTeam->manager);
        $this->assertEquals($team->city, $retrievedTeam->city);
        $this->assertEquals($team->state, $retrievedTeam->state);
        $this->assertEquals($team->user_id, $retrievedTeam->user_id);
    }

    /** @test */
    public function user_can_create_a_team()
    {
    	$data = [];
    	$data['name'] = 'Athletics';
    	$data['manager'] = 'Bob Melvin';
    	$data['city'] = 'Oakland';
    	$data['state'] = 'CA';

        $response = $this->actingAs($this->user, 'api')
                         ->post('/api/teams', $data);
        $response->assertStatus(200);

        $team = Team::first();

        $this->assertEquals($team->name, $data['name']);
        $this->assertEquals($team->manager, $data['manager']);
        $this->assertEquals($team->city, $data['city']);
        $this->assertEquals($team->state, $data['state']);
    }

    /** @test */
    public function user_can_update_a_team()
    {
        $team = factory(Team::class)->create([
            'user_id' => $this->user->id
        ]);

        $newData = [
            'name' => 'Trash Pandas',
            'manager' => 'Joe Blow',
            'city' => 'Racooon City',
            'state' => 'OH'
        ];

        $response = $this->actingAs($this->user, 'api')
                         ->patch('/api/teams/' . $team->id, $newData);
        $response->assertStatus(200);

        $updatedTeam = Team::first();

        $this->assertEquals($updatedTeam->name, $newData['name']);
        $this->assertEquals($updatedTeam->manager, $newData['manager']);
        $this->assertEquals($updatedTeam->city, $newData['city']);
        $this->assertEquals($updatedTeam->state, $newData['state']);
    }
}
